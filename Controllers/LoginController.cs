using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using QuanLyHieuSuat.DTO;
using QuanLyHieuSuat.Models;
using QuanLyHieuSuat.Services;

namespace QuanLyHieuSuat.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        QuanLyHieuSuatContext db = new QuanLyHieuSuatContext();
        private IUserService _userService;
        private string id = "";
        public LoginController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpPost("authenticate")]
        public IActionResult Authenticate(LoginDTO model)
        {
            var response = _userService.Authenticate(model);

            if (response == null)
                return BadRequest(new { message = "Sai tài khoản hoặc mật khẩu" });
            id = response.Mavienchuc.ToString();
            return Ok(response);
        }


        [HttpPut("{id}")]
        public int Edit(Vienchuc employee)
        {
            Vienchuc vc = db.Vienchuc.Find(employee.Mavienchuc);
            vc.Mavienchuc = vc.Mavienchuc;
            vc.Mail = vc.Mail;
            vc.Matkhau = vc.Matkhau;
            vc.Mabomon = vc.Mabomon;
            vc.Machucdanh = vc.Machucdanh;
            vc.Machucvu = vc.Machucvu;
            vc.Ngaylamviec = vc.Ngaylamviec;
            vc.Hoten = employee.Hoten;
            vc.Sdt = employee.Sdt;
            vc.Diachi = employee.Diachi;
            vc.Ngaysinh = employee.Ngaysinh;
            vc.Gioitinh = employee.Gioitinh;
            try
            {
                db.Entry(vc).State = EntityState.Modified;
                db.SaveChanges();
                return 1;
            }
            catch
            {
                throw;
            }
        }

    }
}
