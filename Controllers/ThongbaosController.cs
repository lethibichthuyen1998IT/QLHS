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
    public class ThongbaosController : ControllerBase
    {
        QuanLyHieuSuatContext db = new QuanLyHieuSuatContext();



        [HttpGet]
        public IEnumerable<Thongbao> Index()
        {
            try
            {
                return db.Thongbao.ToList();
            }
            catch
            {
                throw;
            }
        }
        [HttpGet("{id}")]
        public Thongbao ct(int id)
        {
            Thongbao tb = db.Thongbao.Find(id);
            try
            {
               return tb;
            }
            catch
            {
                throw;
            }
        }

        [HttpPost]
        public int Create([FromBody] Thongbao tb)
        {

            db.Thongbao.Add(tb);
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

        public int Edit(Thongbao tb)
        {
            try
            {
                db.Entry(tb).State = EntityState.Modified;
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

                Thongbao tb = db.Thongbao.Find(id);

                if (tb != null)
                {

                    db.Thongbao.Remove(tb);
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
