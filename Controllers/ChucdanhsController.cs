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

        public int Delete(string id)
        {
            try
            {

                Chucdanh cd = db.Chucdanh.Find(id);

                if (cd != null)
                {

                    db.Chucdanh.Remove(cd);
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
