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
    public class ChucvusController : ControllerBase
    {
        QuanLyHieuSuatContext db = new QuanLyHieuSuatContext();



        [HttpGet]
        public IEnumerable<Chucvu> Index()
        {
            try
            {
                return db.Chucvu.ToList();
            }
            catch
            {
                throw;
            }
        }
        [HttpGet("list")]
        public IEnumerable<Chucvu> list()
        {
            try
            {
                var cv = from a in db.Chucvu where a.Machucvu != "TK" && a.Machucvu != "TBM" select a;
                return cv.ToList();
            }
            catch
            {
                throw;
            }
        }

        [HttpPost]
        public int Create([FromBody] Chucvu cvu)
        {

            db.Chucvu.Add(cvu);
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

        public int Edit(Chucvu cvu)
        {
            try
            {
                db.Entry(cvu).State = EntityState.Modified;
                db.SaveChanges();
                return 1;
            }
            catch
            {
                throw;
            }
        }

        [HttpDelete("{id}")]

        public IActionResult Delete(string id)
        {
            try
            {

                Chucvu cv = db.Chucvu.Find(id);

                if (cv != null)
                {
                    if (db.Quyen.Where(x => x.Machucvu == cv.Machucvu).Count() > 0 || db.Vienchuc.Where(x => x.Machucvu == cv.Machucvu).Count() > 0)
                    {
                        return BadRequest();
                    }
                    else
                    {
                        db.Chucvu.Remove(cv);
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
