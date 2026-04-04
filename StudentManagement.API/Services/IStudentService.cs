using StudentManagement.API.DTOs;

namespace StudentManagement.API.Services;

public interface IStudentService
{
    Task<IEnumerable<StudentResponseDto>> GetAllStudentsAsync();
    Task<StudentResponseDto?> GetStudentByIdAsync(int id);
    Task<StudentResponseDto> CreateStudentAsync(StudentCreateDto dto);
    Task<StudentResponseDto?> UpdateStudentAsync(int id, StudentUpdateDto dto);
    Task<bool> DeleteStudentAsync(int id);
}
