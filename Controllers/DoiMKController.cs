using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using QuanLyHieuSuat.Models;

namespace QuanLyHieuSuat.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class DoiMKController : ControllerBase
    {
        QuanLyHieuSuatContext db = new QuanLyHieuSuatContext();

        [HttpPut("{id}")]
        public int ChangePassword(Vienchuc employee)
        {
            Vienchuc vc = db.Vienchuc.Find(employee.Mavienchuc);
            vc.Mavienchuc = vc.Mavienchuc;
            vc.Mail = vc.Mail;
            vc.Matkhau = employee.Matkhau;
            vc.Mabomon = vc.Mabomon;
            vc.Machucdanh = vc.Machucdanh;
            vc.Machucvu = vc.Machucvu;
            vc.Ngaylamviec = vc.Ngaylamviec;
            vc.Hoten = vc.Hoten;
            vc.Sdt = vc.Sdt;
            vc.Diachi = vc.Diachi;
            vc.Ngaysinh = vc.Ngaysinh;
            vc.Gioitinh = vc.Gioitinh;
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
