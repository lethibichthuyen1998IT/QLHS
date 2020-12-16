using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using QuanLyHieuSuat.DTO;
using QuanLyHieuSuat.Models;

namespace QuanLyHieuSuat.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class DmCongviecsController : ControllerBase
    {
        QuanLyHieuSuatContext db = new QuanLyHieuSuatContext();


        [HttpGet]
        public IEnumerable<DanhMucDTO> Index()
        {
            var dm = from a in db.Danhmuc
                     join b in db.Linhvuccongviec on a.Masolinhvuc equals b.Masolinhvuc

                     select new DanhMucDTO()
                     {
                         Masodanhmuc = a.Masodanhmuc,
                         Masolinhvuc = b.Masolinhvuc,
                         Tendanhmuc = a.Tendanhmuc,
                         Tenlinhvuc = b.Tenlinhvuc,

                     };

            try
            {
                return dm.ToList();
            }
            catch
            {
                throw;
            }
        }

        [HttpPost]
        public int Create([FromBody] Danhmuc dm)
        {



            db.Danhmuc.Add(dm);
            try
            {
                if (ModelState.IsValid)
                {
                    db.SaveChanges();
                }
                return 1;

            }
            catch (DbUpdateException)
            {
                throw;
            }
        }



        [HttpPut("{id}")]

        public int Edit(Danhmuc dm)
        {
            try
            {
                db.Entry(dm).State = EntityState.Modified;
                db.SaveChanges();
                return 1;
            }
            catch
            {
                throw;
            }
        }

        [HttpDelete("{id}")]

        public IActionResult Delete(int id)
        {
            try
            {

                Danhmuc dm = db.Danhmuc.Find(id);

                if (dm != null)
                {
                    if (db.Congviec.Where(x => x.Masodanhmuc == dm.Masodanhmuc).Count() > 0)
                    {
                        return BadRequest();
                    }
                    else
                    {
                        db.Danhmuc.Remove(dm);
                        db.SaveChanges();
                        return Ok();
                    }
                }
                else
                {
                    return BadRequest();
                }
            }
            catch
            {
                throw;
            }
        }
    }
}
