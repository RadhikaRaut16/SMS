using Microsoft.AspNetCore.Mvc;
using StudentManagement.API.DTOs;
using StudentManagement.API.Services;

namespace StudentManagement.API.Controllers;

[ApiController]
[Route("api/[controller]")]
[Produces("application/json")]
public class AuthController : ControllerBase
{
    private readonly IAuthService _authService;
    private readonly ILogger<AuthController> _logger;

    public AuthController(IAuthService authService, ILogger<AuthController> logger)
    {
        _authService = authService;
        _logger = logger;
    }

    /// <summary>Login and receive a JWT token</summary>
    /// <remarks>
    /// Demo credentials:
    /// - admin / Admin@123
    /// - user  / User@123
    /// </remarks>
    [HttpPost("login")]
    [ProducesResponseType(typeof(ApiResponse<LoginResponseDto>), 200)]
    [ProducesResponseType(401)]
    public IActionResult Login([FromBody] LoginDto dto)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        var result = _authService.Authenticate(dto.Username, dto.Password);
        if (result is null)
        {
            _logger.LogWarning("Failed login attempt for username: {Username}", dto.Username);
            return Unauthorized(ApiResponse<object>.Fail("Invalid username or password"));
        }

        _logger.LogInformation("Successful login for username: {Username}", dto.Username);
        return Ok(ApiResponse<LoginResponseDto>.Ok(result, "Login successful"));
    }
}