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
    public class QuyensController : ControllerBase
    {
        QuanLyHieuSuatContext db = new QuanLyHieuSuatContext();

        public IEnumerable<Quyen> Index()
        {
            try
            {
                return db.Quyen.ToList();
            }
            catch
            {
                throw;
            }
        }

        [HttpPost]
        public int Create([FromBody] Quyen q)
        {



            db.Quyen.Add(q);
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

        [HttpDelete("{machucvu}/{machucnang}")]

        public int Delete(string machucvu, string machucnang)
        {
            try
            {

                Quyen q = db.Quyen.Find(machucvu, machucnang);

                if (q != null)
                {

                    db.Quyen.Remove(q);
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

