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
    public class ChucdanhsController : ControllerBase
    {
        QuanLyHieuSuatContext db = new QuanLyHieuSuatContext();




        [HttpGet]
        public IEnumerable<Chucdanh> Index()
        {
            try
            {
                return db.Chucdanh.ToList();
            }
            catch
            {
                throw;
            }
        }

        [HttpPost]
        public int Create([FromBody] Chucdanh cd)
        {

            db.Chucdanh.Add(cd);
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

        public int Edit(Chucdanh cd)
        {
            try
            {
                db.Entry(cd).State = EntityState.Modified;
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

                Chucdanh cn = db.Chucdanh.Find(id);

                if (cn != null)
                {
                    if (db.Vienchuc.Where(x => x.Machucdanh == cn.Machucdanh).Count() > 0)
                    {
                        return BadRequest();
                    }

                    db.Chucdanh.Remove(cn);
                    db.SaveChanges();
                    return Ok();
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
