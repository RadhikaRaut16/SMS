using StudentManagement.API.DTOs;
using StudentManagement.API.Models;
using StudentManagement.API.Repositories;

namespace StudentManagement.API.Services;

public class StudentService : IStudentService
{
    private readonly IStudentRepository _repo;
    private readonly ILogger<StudentService> _logger;

    public StudentService(IStudentRepository repo, ILogger<StudentService> logger)
    {
        _repo = repo;
        _logger = logger;
    }

    public async Task<IEnumerable<StudentResponseDto>> GetAllStudentsAsync()
    {
        _logger.LogInformation("Fetching all students");
        var students = await _repo.GetAllAsync();
        return students.Select(MapToDto);
    }

    public async Task<StudentResponseDto?> GetStudentByIdAsync(int id)
    {
        _logger.LogInformation("Fetching student with ID: {Id}", id);
        var student = await _repo.GetByIdAsync(id);
        return student is null ? null : MapToDto(student);
    }

    public async Task<StudentResponseDto> CreateStudentAsync(StudentCreateDto dto)
    {
        var existing = await _repo.GetByEmailAsync(dto.Email);
        if (existing is not null)
            throw new InvalidOperationException($"A student with email '{dto.Email}' already exists.");

        var student = new Student
        {
            Name = dto.Name,
            Email = dto.Email,
            Age = dto.Age,
            Course = dto.Course,
            CreatedDate = DateTime.UtcNow
        };

        var created = await _repo.CreateAsync(student);
        _logger.LogInformation("Created student with ID: {Id}", created.Id);
        return MapToDto(created);
    }

    public async Task<StudentResponseDto?> UpdateStudentAsync(int id, StudentUpdateDto dto)
    {
        var student = await _repo.GetByIdAsync(id);
        if (student is null) return null;

        var existing = await _repo.GetByEmailAsync(dto.Email);
        if (existing is not null && existing.Id != id)
            throw new InvalidOperationException($"Email '{dto.Email}' is already used by another student.");

        student.Name = dto.Name;
        student.Email = dto.Email;
        student.Age = dto.Age;
        student.Course = dto.Course;

        var updated = await _repo.UpdateAsync(student);
        _logger.LogInformation("Updated student with ID: {Id}", id);
        return MapToDto(updated);
    }

    public async Task<bool> DeleteStudentAsync(int id)
    {
        _logger.LogInformation("Deleting student with ID: {Id}", id);
        return await _repo.DeleteAsync(id);
    }

    private static StudentResponseDto MapToDto(Student s) => new()
    {
        Id = s.Id,
        Name = s.Name,
        Email = s.Email,
        Age = s.Age,
        Course = s.Course,
        CreatedDate = s.CreatedDate
    };
}