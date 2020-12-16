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
    public class LVCongviecsController : ControllerBase
    {
        QuanLyHieuSuatContext db = new QuanLyHieuSuatContext();


        [HttpGet]
        public IEnumerable<Linhvuccongviec> Index()
        {
            try
            {
                return db.Linhvuccongviec.ToList();
            }
            catch
            {
                throw;
            }
        }

        [HttpPost]
        public int Create([FromBody] Linhvuccongviec lv)
        {



            db.Linhvuccongviec.Add(lv);
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

        public int Edit(Linhvuccongviec lv)
        {
            try
            {
                db.Entry(lv).State = EntityState.Modified;
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

                Linhvuccongviec lv = db.Linhvuccongviec.Find(id);


                if (lv != null)
                {
                    if (db.Danhmuc.Where(x => x.Masolinhvuc == lv.Masolinhvuc).Count() > 0)
                    {
                        return BadRequest();
                    }
                    else
                    {

                        db.Linhvuccongviec.Remove(lv);
                        db.SaveChanges();
                        return Ok();
                    }
                }
                else
                {
                    return BadRequest("Không tìm thấy id này!");
                }
            }
            catch
            {
                throw;
            }
        }
    }
}
