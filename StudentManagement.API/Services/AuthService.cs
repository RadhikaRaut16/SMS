using Microsoft.IdentityModel.Tokens;
using StudentManagement.API.DTOs;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace StudentManagement.API.Services;

public interface IAuthService
{
    LoginResponseDto? Authenticate(string username, string password);
}

public class AuthService : IAuthService
{
    private readonly IConfiguration _config;

    // In production: replace with DB user lookup + password hashing (BCrypt)
    private readonly Dictionary<string, (string Password, string Role)> _users = new()
    {
        { "admin", ("Admin@123", "Admin") },
        { "user",  ("User@123",  "User")  }
    };

    public AuthService(IConfiguration config)
    {
        _config = config;
    }

    public LoginResponseDto? Authenticate(string username, string password)
    {
        if (!_users.TryGetValue(username, out var userData) || userData.Password != password)
            return null;

        var expiryMinutes = double.Parse(_config["Jwt:ExpiryMinutes"] ?? "60");
        var expiresAt = DateTime.UtcNow.AddMinutes(expiryMinutes);
        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]!));
        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        var claims = new[]
        {
            new Claim(ClaimTypes.Name,                          username),
            new Claim(ClaimTypes.Role,                          userData.Role),
            new Claim(JwtRegisteredClaimNames.Jti,              Guid.NewGuid().ToString()),
            new Claim(JwtRegisteredClaimNames.Iat,
                      DateTimeOffset.UtcNow.ToUnixTimeSeconds().ToString(),
                      ClaimValueTypes.Integer64)
        };

        var token = new JwtSecurityToken(
            issuer: _config["Jwt:Issuer"],
            audience: _config["Jwt:Audience"],
            claims: claims,
            expires: expiresAt,
            signingCredentials: creds
        );

        return new LoginResponseDto
        {
            Token = new JwtSecurityTokenHandler().WriteToken(token),
            Username = username,
            Role = userData.Role,
            ExpiresAt = expiresAt
        };
    }
}