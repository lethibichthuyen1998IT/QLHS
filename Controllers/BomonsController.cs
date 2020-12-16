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
    public class BomonsController : ControllerBase
    {
        QuanLyHieuSuatContext db = new QuanLyHieuSuatContext();



        [HttpGet]
        public IEnumerable<Bomon> Index()
        {
            try
            {
                return db.Bomon.ToList();
            }
            catch
            {
                throw;
            }
        }

        [HttpPost]
        public int Create([FromBody] Bomon bm)
        {



            db.Bomon.Add(bm);
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

        public int Edit(Bomon bm)
        {
            try
            {
                db.Entry(bm).State = EntityState.Modified;
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

                Bomon bm = db.Bomon.Find(id);

                if (bm != null)
                {
                    if (db.Vienchuc.Where(x => x.Mabomon == bm.Mabomon).Count() > 0)
                    {
                        return BadRequest();
                    }
                    else
                    {

                        db.Bomon.Remove(bm);
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
