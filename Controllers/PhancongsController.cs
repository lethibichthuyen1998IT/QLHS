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
    public class PhancongsController : ControllerBase
    {
        QuanLyHieuSuatContext db = new QuanLyHieuSuatContext();



        [HttpGet("{id}")]
        public IEnumerable<Phancong> Index(string id)
        {
            try
            {
                var pc = from a in db.Phancong
                         join b in db.Vienchuc on a.Mavienchuc equals b.Mavienchuc
                         where a.Mavienchuc == id
                         select a;
                return pc.ToList();
            }
            catch
            {
                throw;
            }
        }
        [HttpGet("bomopc/{id}")]
        public IEnumerable<Phancong> Bomon(string id)
        {
            try
            {

                var pc = from a in db.Phancong
                         join b in db.Vienchuc on a.Mavienchuc equals b.Mavienchuc
                         where b.Mabomon == id
                         select a;

                return pc.ToList();
            }
            catch
            {
                throw;
            }
        }

        [HttpPost]
        public int Create([FromBody] Phancong pc)
        {

            db.Phancong.Add(pc);
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

        public int Edit(Phancong pc)
        {
            try
            {
                db.Entry(pc).State = EntityState.Modified;
                db.SaveChanges();
                return 1;
            }
            catch
            {
                throw;
            }
        }

        [HttpDelete("{id}")]

        public int Delete(int id)
        {
            try
            {

                Phancong pc = db.Phancong.Find(id);

                if (pc != null)
                {

                    db.Phancong.Remove(pc);
                    db.SaveChanges();
                    return 1;
                }
                else
                {
                    return 0;
                }
            }
            catch
            {
                throw;
            }
        }


    }
}
