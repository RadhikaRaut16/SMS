using System.ComponentModel.DataAnnotations;

namespace StudentManagement.API.DTOs;

public class StudentCreateDto
{
    [Required(ErrorMessage = "Name is required")]
    [MinLength(2, ErrorMessage = "Name must be at least 2 characters")]
    [MaxLength(100, ErrorMessage = "Name cannot exceed 100 characters")]
    public string Name { get; set; } = string.Empty;

    [Required(ErrorMessage = "Email is required")]
    [EmailAddress(ErrorMessage = "Please provide a valid email address")]
    [MaxLength(150)]
    public string Email { get; set; } = string.Empty;

    [Range(1, 120, ErrorMessage = "Age must be between 1 and 120")]
    public int Age { get; set; }

    [Required(ErrorMessage = "Course is required")]
    [MinLength(2, ErrorMessage = "Course must be at least 2 characters")]
    [MaxLength(100, ErrorMessage = "Course cannot exceed 100 characters")]
    public string Course { get; set; } = string.Empty;
}

public class StudentUpdateDto
{
    [Required(ErrorMessage = "Name is required")]
    [MinLength(2)]
    [MaxLength(100)]
    public string Name { get; set; } = string.Empty;

    [Required(ErrorMessage = "Email is required")]
    [EmailAddress(ErrorMessage = "Please provide a valid email address")]
    [MaxLength(150)]
    public string Email { get; set; } = string.Empty;

    [Range(1, 120, ErrorMessage = "Age must be between 1 and 120")]
    public int Age { get; set; }

    [Required(ErrorMessage = "Course is required")]
    [MinLength(2)]
    [MaxLength(100)]
    public string Course { get; set; } = string.Empty;
}

public class LoginDto
{
    [Required(ErrorMessage = "Username is required")]
    public string Username { get; set; } = string.Empty;

    [Required(ErrorMessage = "Password is required")]
    public string Password { get; set; } = string.Empty;
}

public class StudentResponseDto
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public int Age { get; set; }
    public string Course { get; set; } = string.Empty;
    public DateTime CreatedDate { get; set; }
}

public class LoginResponseDto
{
    public string Token { get; set; } = string.Empty;
    public string Username { get; set; } = string.Empty;
    public string Role { get; set; } = string.Empty;
    public DateTime ExpiresAt { get; set; }
}

public class ApiResponse<T>
{
    public bool Success { get; set; }
    public string Message { get; set; } = string.Empty;
    public T? Data { get; set; }
    public DateTime Timestamp { get; set; } = DateTime.UtcNow;

    public static ApiResponse<T> Ok(T data, string message = "Success") =>
        new() { Success = true, Message = message, Data = data };

    public static ApiResponse<T> Fail(string message) =>
        new() { Success = false, Message = message };
}

public class ValidationErrorResponse
{
    public bool Success { get; set; } = false;
    public string Message { get; set; } = "Validation failed";
    public Dictionary<string, string[]> Errors { get; set; } = new();
}