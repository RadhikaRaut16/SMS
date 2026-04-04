using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using StudentManagement.API.DTOs;
using StudentManagement.API.Services;

namespace StudentManagement.API.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
[Produces("application/json")]
public class StudentsController : ControllerBase
{
    private readonly IStudentService _service;
    private readonly ILogger<StudentsController> _logger;

    public StudentsController(IStudentService service, ILogger<StudentsController> logger)
    {
        _service = service;
        _logger = logger;
    }

    /// <summary>Get all students</summary>
    [HttpGet]
    [ProducesResponseType(typeof(ApiResponse<IEnumerable<StudentResponseDto>>), 200)]
    public async Task<IActionResult> GetAll()
    {
        var students = await _service.GetAllStudentsAsync();
        var list = students.ToList();
        return Ok(ApiResponse<IEnumerable<StudentResponseDto>>
            .Ok(list, $"{list.Count} student(s) found"));
    }

    /// <summary>Get a student by ID</summary>
    [HttpGet("{id:int}")]
    [ProducesResponseType(typeof(ApiResponse<StudentResponseDto>), 200)]
    [ProducesResponseType(404)]
    public async Task<IActionResult> GetById(int id)
    {
        if (id <= 0)
            return BadRequest(ApiResponse<object>.Fail("ID must be a positive integer"));

        var student = await _service.GetStudentByIdAsync(id);
        if (student is null)
            return NotFound(ApiResponse<StudentResponseDto>.Fail($"Student with ID {id} not found"));

        return Ok(ApiResponse<StudentResponseDto>.Ok(student));
    }

    /// <summary>Create a new student</summary>
    [HttpPost]
    [ProducesResponseType(typeof(ApiResponse<StudentResponseDto>), 201)]
    [ProducesResponseType(typeof(ValidationErrorResponse), 400)]
    public async Task<IActionResult> Create([FromBody] StudentCreateDto dto)
    {
        if (!ModelState.IsValid)
        {
            var errors = ModelState
                .Where(x => x.Value?.Errors.Count > 0)
                .ToDictionary(k => k.Key, v => v.Value!.Errors.Select(e => e.ErrorMessage).ToArray());
            return BadRequest(new ValidationErrorResponse { Errors = errors });
        }

        var created = await _service.CreateStudentAsync(dto);
        return CreatedAtAction(nameof(GetById), new { id = created.Id },
            ApiResponse<StudentResponseDto>.Ok(created, "Student created successfully"));
    }

    /// <summary>Update an existing student</summary>
    [HttpPut("{id:int}")]
    [ProducesResponseType(typeof(ApiResponse<StudentResponseDto>), 200)]
    [ProducesResponseType(typeof(ValidationErrorResponse), 400)]
    [ProducesResponseType(404)]
    public async Task<IActionResult> Update(int id, [FromBody] StudentUpdateDto dto)
    {
        if (id <= 0)
            return BadRequest(ApiResponse<object>.Fail("ID must be a positive integer"));

        if (!ModelState.IsValid)
        {
            var errors = ModelState
                .Where(x => x.Value?.Errors.Count > 0)
                .ToDictionary(k => k.Key, v => v.Value!.Errors.Select(e => e.ErrorMessage).ToArray());
            return BadRequest(new ValidationErrorResponse { Errors = errors });
        }

        var updated = await _service.UpdateStudentAsync(id, dto);
        if (updated is null)
            return NotFound(ApiResponse<StudentResponseDto>.Fail($"Student with ID {id} not found"));

        return Ok(ApiResponse<StudentResponseDto>.Ok(updated, "Student updated successfully"));
    }

    /// <summary>Delete a student by ID</summary>
    [HttpDelete("{id:int}")]
    [ProducesResponseType(typeof(ApiResponse<object>), 200)]
    [ProducesResponseType(404)]
    public async Task<IActionResult> Delete(int id)
    {
        if (id <= 0)
            return BadRequest(ApiResponse<object>.Fail("ID must be a positive integer"));

        var deleted = await _service.DeleteStudentAsync(id);
        if (!deleted)
            return NotFound(ApiResponse<object>.Fail($"Student with ID {id} not found"));

        return Ok(ApiResponse<object>.Ok(null!, "Student deleted successfully"));
    }
}