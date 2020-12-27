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
    public class PhancongsController : ControllerBase
    {
        QuanLyHieuSuatContext db = new QuanLyHieuSuatContext();



        [HttpGet("{id}/{idnh}")]
        public IEnumerable<PhanCongDTO> Index(string id, int idnh)
        {
            try
            {
                var pc = from a in db.Phancong
                         join b in db.Vienchuc on a.Mavienchuc equals b.Mavienchuc
                         join c in db.Monhoc on a.Idmonhoc equals c.Idmonhoc
                         where a.Mavienchuc == id && a.Manamhoc == idnh

                         select new PhanCongDTO()
                         {
                             Mavienchuc = a.Mavienchuc,
                             Maphancong=a.Maphancong,
                             Hoten = b.Hoten,
                             Tenmonhoc = c.Tenmonhoc,
                             Sotc = c.Sotc,
                             Soluong= a.Soluong,
                             Manamhoc = a.Manamhoc,
                             Idmonhoc=c.Idmonhoc

                             


                         };
                return pc.ToList();
            }
            catch
            {
                throw;
            }
        }

        [HttpGet("VC/{idvc}")]
        public IEnumerable<PhanCongDTO> VC(string idvc)
        {

            var nh = (from a in db.Namhoc orderby a.Manamhoc descending select a.Manamhoc).FirstOrDefault();


            try
            {
                var pc = from a in db.Phancong
                         join b in db.Vienchuc on a.Mavienchuc equals b.Mavienchuc
                         join c in db.Monhoc on a.Idmonhoc equals c.Idmonhoc
                         where a.Mavienchuc == idvc && a.Manamhoc == nh && a.Idmonhoc!=1 && a.Idmonhoc!=2

                         select new PhanCongDTO()
                         {
                             Mavienchuc = a.Mavienchuc,
                             Hoten = b.Hoten,
                             Tenmonhoc = c.Tenmonhoc,
                             Sotc = c.Sotc,
                             Soluong = a.Soluong,
                             Maphancong = a.Maphancong,
                             Tongsotiet = (c.Sotietlt + c.Sotietth) * a.Soluong

                         };

                return pc.ToList();

            }
            catch
            {
                throw;
            }
        }
        [HttpGet("LV/{idvc}")]
        public PhanCongDTO LV(string idvc)
        {

            var nh = (from a in db.Namhoc orderby a.Manamhoc descending select a.Manamhoc).FirstOrDefault();
            

            try
            {
                var pc = from a in db.Phancong
                         join b in db.Vienchuc on a.Mavienchuc equals b.Mavienchuc
                         join c in db.Monhoc on a.Idmonhoc equals c.Idmonhoc
                         where a.Mavienchuc == idvc && a.Manamhoc == nh && c.Idmonhoc==1

                         select new PhanCongDTO()
                         {
                             Mavienchuc = a.Mavienchuc,
                             Hoten = b.Hoten,
                             Tenmonhoc = c.Tenmonhoc,
                             Maphancong = a.Maphancong,
                             Sotc = c.Sotc,
                             Soluong = a.Soluong,

                             Tongsotiet =  (c.Sotietlt + c.Sotietth)*a.Soluong

                         };
               
                return  pc.FirstOrDefault();
               
            }
            catch
            {
                throw;
            }
        }
        [HttpGet("NL/{idvc}")]
        public PhanCongDTO NL(string idvc)
        {

            var nh = (from a in db.Namhoc orderby a.Manamhoc descending select a.Manamhoc).FirstOrDefault();


            try
            {
                var pc = from a in db.Phancong
                         join b in db.Vienchuc on a.Mavienchuc equals b.Mavienchuc
                         join c in db.Monhoc on a.Idmonhoc equals c.Idmonhoc
                         where a.Mavienchuc == idvc && a.Manamhoc == nh && c.Idmonhoc == 2

                         select new PhanCongDTO()
                         {
                             Mavienchuc = a.Mavienchuc,
                             Hoten = b.Hoten,
                             Tenmonhoc = c.Tenmonhoc,
                             Sotc = c.Sotc,
                             Maphancong = a.Maphancong,
                             Soluong =a.Soluong,
                             Tongsotiet = (c.Sotietlt + c.Sotietth) * a.Soluong

                         };

                return pc.FirstOrDefault();

            }
            catch
            {
                throw;
            }
        }
        [HttpGet("TStiet/{idvc}")]
        public string TS(string idvc)
        {

            var nh = (from a in db.Namhoc orderby a.Manamhoc descending select a.Manamhoc).FirstOrDefault();

            
            try
            {
                var pc = (from a in db.Phancong
                          join b in db.Vienchuc on a.Mavienchuc equals b.Mavienchuc
                          join c in db.Monhoc on a.Idmonhoc equals c.Idmonhoc
                          where a.Mavienchuc == idvc && a.Manamhoc == nh
                          select (c.Sotietlt*a.Soluong + c.Sotietth*a.Soluong)).Sum();

                        
               
                return pc.ToString();

            }
            catch
            {
                throw;
            }
        }


        [HttpPost("themmonhoc")]
        public int mh([FromBody] Phancong pc)
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
