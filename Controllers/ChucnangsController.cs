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
    public class ChucnangsController : ControllerBase
    {
        QuanLyHieuSuatContext db = new QuanLyHieuSuatContext();

        public string auto_id()
        {

            int id;
            string autoID = "CN";
            if (db.Chucnang.Count() == 0) id = 0;
            else
            {
                var maxID = db.Chucnang.Max(x => x.Machucnang);
                id = int.Parse(maxID.Substring(3));
            }
            id++;
            switch (id.ToString().Length)
            {
                case 1:
                    autoID += "00" + id;
                    break;
                case 2:
                    autoID += "0" + id;
                    break;
                default:
                    autoID += id;
                    break;
            }
            return autoID;
        }

        [HttpGet]
        public IEnumerable<Chucnang> Index()
        {
            try
            {
                return db.Chucnang.ToList();
            }
            catch
            {
                throw;
            }
        }

        [HttpPost]
        public int Create([FromBody] Chucnang cn)
        {


            cn.Machucnang = auto_id();
            db.Chucnang.Add(cn);
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

        public int Edit(Chucnang cn)
        {
            try
            {
                db.Entry(cn).State = EntityState.Modified;
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

                Chucnang cn = db.Chucnang.Find(id);

                if (cn != null)
                {
                    if (db.Quyen.Where(x => x.Machucnang == cn.Machucnang).Count() > 0)
                    {
                        return BadRequest();
                    }

                    db.Chucnang.Remove(cn);
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
