using Microsoft.EntityFrameworkCore;
using StudentManagement.API.Models;
using System.Reflection.Emit;

namespace StudentManagement.API.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<Student> Students => Set<Student>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Student>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Name).IsRequired().HasMaxLength(100);
            entity.Property(e => e.Email).IsRequired().HasMaxLength(150);
            entity.HasIndex(e => e.Email).IsUnique();
            entity.Property(e => e.Course).IsRequired().HasMaxLength(100);
            entity.Property(e => e.CreatedDate).HasDefaultValueSql("GETUTCDATE()");
        });

        // Seed data
        modelBuilder.Entity<Student>().HasData(
            new Student { Id = 1, Name = "Rahul Sharma", Email = "rahul@example.com", Age = 21, Course = "Computer Science", CreatedDate = DateTime.UtcNow },
            new Student { Id = 2, Name = "Priya Patel", Email = "priya@example.com", Age = 22, Course = "Information Technology", CreatedDate = DateTime.UtcNow }
        );
    }
}
