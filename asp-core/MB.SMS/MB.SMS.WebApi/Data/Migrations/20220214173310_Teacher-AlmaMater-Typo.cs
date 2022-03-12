using Microsoft.EntityFrameworkCore.Migrations;

namespace MB.SMS.WebApi.Data.Migrations
{
    public partial class TeacherAlmaMaterTypo : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "AlamaMater",
                table: "Teachers",
                newName: "AlmaMater");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "AlmaMater",
                table: "Teachers",
                newName: "AlamaMater");
        }
    }
}
