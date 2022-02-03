using Microsoft.EntityFrameworkCore.Migrations;

namespace MB.SMS.WebApi.Data.Migrations
{
    public partial class corrected_properties : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Classes_Teachers_TeacherId",
                table: "Classes");

            migrationBuilder.DropColumn(
                name: "Course_Id",
                table: "Classes");

            migrationBuilder.DropColumn(
                name: "Teacher_Id",
                table: "Classes");

            migrationBuilder.RenameColumn(
                name: "School_Degree",
                table: "Teachers",
                newName: "SchoolDegree");

            migrationBuilder.RenameColumn(
                name: "Room_Name",
                table: "Classes",
                newName: "RoomName");

            migrationBuilder.AlterColumn<int>(
                name: "TeacherId",
                table: "Classes",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Classes_Teachers_TeacherId",
                table: "Classes",
                column: "TeacherId",
                principalTable: "Teachers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Classes_Teachers_TeacherId",
                table: "Classes");

            migrationBuilder.RenameColumn(
                name: "SchoolDegree",
                table: "Teachers",
                newName: "School_Degree");

            migrationBuilder.RenameColumn(
                name: "RoomName",
                table: "Classes",
                newName: "Room_Name");

            migrationBuilder.AlterColumn<int>(
                name: "TeacherId",
                table: "Classes",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddColumn<int>(
                name: "Course_Id",
                table: "Classes",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "Teacher_Id",
                table: "Classes",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddForeignKey(
                name: "FK_Classes_Teachers_TeacherId",
                table: "Classes",
                column: "TeacherId",
                principalTable: "Teachers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
