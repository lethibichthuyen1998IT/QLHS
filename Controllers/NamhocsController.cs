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
    public class NamhocsController : ControllerBase
    {
        QuanLyHieuSuatContext db = new QuanLyHieuSuatContext();



        [HttpGet]
        public IEnumerable<Namhoc> Index()
        {
            var nh = (from a in db.Namhoc orderby a.Manamhoc descending select a);
            try
            {
             
                return nh.ToList();
                
            }
            catch
            {
                throw;
            }
        }
        [HttpGet("namhoc")]
        public Namhoc nhcuoi()
        {
            try
            {
                var nh = (from a in db.Namhoc orderby a.Manamhoc descending select a);
                return nh.FirstOrDefault();
            }
            catch
            {
                throw;
            }
        }

        [HttpPost]
        public int Create([FromBody] Namhoc nh)
        {

            db.Namhoc.Add(nh);
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

        public int Edit(Namhoc nh)
        {
            try
            {
                db.Entry(nh).State = EntityState.Modified;
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

                Namhoc nh = db.Namhoc.Find(id);

                if (nh != null)
                {
                    if (db.Congviec.Where(x => x.Manamhoc == nh.Manamhoc).Count() > 0 || db.Khenthuong.Where(a => a.Manamhoc == nh.Manamhoc).Count() > 0 || db.Danhgia.Where(y => y.Manamhoc == nh.Manamhoc).Count() > 0)
                    {
                        return BadRequest();
                    }
                    else
                    {
                        db.Namhoc.Remove(nh);
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
