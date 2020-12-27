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
    public class VienchucsController : ControllerBase
    {
        QuanLyHieuSuatContext db = new QuanLyHieuSuatContext();
        [HttpGet]
        public IEnumerable<VienChucDTO> Index()
        {
            try
            {
                var vc = from a in db.Vienchuc
                         join b in db.Chucvu on a.Machucvu equals b.Machucvu
                         join c in db.Bomon on a.Mabomon equals c.Mabomon
                         join d in db.Chucdanh on a.Machucdanh equals d.Machucdanh
                      
                         select new VienChucDTO()
                         {
                             Mavienchuc = a.Mavienchuc,
                             Mabomon = c.Mabomon,
                             Machucvu = b.Machucvu,
                             Machucdanh = d.Machucdanh,
                             Hoten = a.Hoten,
                             Sdt = a.Sdt,
                             Ngaysinh = a.Ngaysinh,
                             Gioitinh = a.Gioitinh,
                             Diachi = a.Diachi,
                             Mail = a.Mail,
                             Matkhau = a.Matkhau,
                             Ngaylamviec = a.Ngaylamviec,
                             Tenbomon = c.Tenbomon,
                             Tenchucvu = b.Tenchucvu,
                             Tenchucdanh = d.Tenchucdanh,
                             Hangchucdanh = d.Hangchucdanh,
                             Bacluong = a.Bacluong
                         };
                return vc.ToList();
            }
            catch (DbUpdateException)
            {
                throw;
            }
        }
        [HttpGet("thud")]
        public IEnumerable<VienChucDTO> thud()
        {
            string id = "THUD";
            try
            {
                var vc = from a in db.Vienchuc
                         join b in db.Chucvu on a.Machucvu equals b.Machucvu
                         join c in db.Bomon on a.Mabomon equals c.Mabomon
                         join d in db.Chucdanh on a.Machucdanh equals d.Machucdanh
                         where a.Mabomon==id
                         select new VienChucDTO()
                         {
                             Mavienchuc = a.Mavienchuc,
                             Mabomon = c.Mabomon,
                             Machucvu = b.Machucvu,
                             Machucdanh = d.Machucdanh,
                             Hoten = a.Hoten,
                             Sdt = a.Sdt,
                             Ngaysinh = a.Ngaysinh,
                             Gioitinh = a.Gioitinh,
                             Diachi = a.Diachi,
                             Mail = a.Mail,
                             Matkhau = a.Matkhau,
                             Ngaylamviec = a.Ngaylamviec,
                             Tenbomon = c.Tenbomon,
                             Tenchucvu = b.Tenchucvu,
                             Tenchucdanh = d.Tenchucdanh,
                             Hangchucdanh = d.Hangchucdanh,
                             Bacluong = a.Bacluong
                         };
                return vc.ToList();
            }
            catch (DbUpdateException)
            {
                throw;
            }
        }
        [HttpGet("cntt")]
        public IEnumerable<VienChucDTO> cntt()
        {
            string id = "CNTT";
            try
            {
                var vc = from a in db.Vienchuc
                         join b in db.Chucvu on a.Machucvu equals b.Machucvu
                         join c in db.Bomon on a.Mabomon equals c.Mabomon
                         join d in db.Chucdanh on a.Machucdanh equals d.Machucdanh
                         where a.Mabomon == id
                         select new VienChucDTO()
                         {
                             Mavienchuc = a.Mavienchuc,
                             Mabomon = c.Mabomon,
                             Machucvu = b.Machucvu,
                             Machucdanh = d.Machucdanh,
                             Hoten = a.Hoten,
                             Sdt = a.Sdt,
                             Ngaysinh = a.Ngaysinh,
                             Gioitinh = a.Gioitinh,
                             Diachi = a.Diachi,
                             Mail = a.Mail,
                             Matkhau = a.Matkhau,
                             Ngaylamviec = a.Ngaylamviec,
                             Tenbomon = c.Tenbomon,
                             Tenchucvu = b.Tenchucvu,
                             Tenchucdanh = d.Tenchucdanh,
                             Hangchucdanh = d.Hangchucdanh,
                             Bacluong = a.Bacluong
                         };
                return vc.ToList();
            }
            catch (DbUpdateException)
            {
                throw;
            }
        }
        [HttpGet("mtt")]
        public IEnumerable<VienChucDTO> mtt()
        {
            string id = "MTT & TT";
            try
            {
                var vc = from a in db.Vienchuc
                         join b in db.Chucvu on a.Machucvu equals b.Machucvu
                         join c in db.Bomon on a.Mabomon equals c.Mabomon
                         join d in db.Chucdanh on a.Machucdanh equals d.Machucdanh
                         where a.Mabomon == id
                         select new VienChucDTO()
                         {
                             Mavienchuc = a.Mavienchuc,
                             Mabomon = c.Mabomon,
                             Machucvu = b.Machucvu,
                             Machucdanh = d.Machucdanh,
                             Hoten = a.Hoten,
                             Sdt = a.Sdt,
                             Ngaysinh = a.Ngaysinh,
                             Gioitinh = a.Gioitinh,
                             Diachi = a.Diachi,
                             Mail = a.Mail,
                             Matkhau = a.Matkhau,
                             Ngaylamviec = a.Ngaylamviec,
                             Tenbomon = c.Tenbomon,
                             Tenchucvu = b.Tenchucvu,
                             Tenchucdanh = d.Tenchucdanh,
                             Hangchucdanh = d.Hangchucdanh,
                             Bacluong = a.Bacluong
                         };
                return vc.ToList();
            }
            catch (DbUpdateException)
            {
                throw;
            }
        }
        [HttpGet("httt")]
        public IEnumerable<VienChucDTO> httt()
        {
            string id = "HTTT";
            try
            {
                var vc = from a in db.Vienchuc
                         join b in db.Chucvu on a.Machucvu equals b.Machucvu
                         join c in db.Bomon on a.Mabomon equals c.Mabomon
                         join d in db.Chucdanh on a.Machucdanh equals d.Machucdanh
                         where a.Mabomon == id
                         select new VienChucDTO()
                         {
                             Mavienchuc = a.Mavienchuc,
                             Mabomon = c.Mabomon,
                             Machucvu = b.Machucvu,
                             Machucdanh = d.Machucdanh,
                             Hoten = a.Hoten,
                             Sdt = a.Sdt,
                             Ngaysinh = a.Ngaysinh,
                             Gioitinh = a.Gioitinh,
                             Diachi = a.Diachi,
                             Mail = a.Mail,
                             Matkhau = a.Matkhau,
                             Ngaylamviec = a.Ngaylamviec,
                             Tenbomon = c.Tenbomon,
                             Tenchucvu = b.Tenchucvu,
                             Tenchucdanh = d.Tenchucdanh,
                             Hangchucdanh = d.Hangchucdanh,
                             Bacluong = a.Bacluong
                         };
                return vc.ToList();
            }
            catch (DbUpdateException)
            {
                throw;
            }
        }
        [HttpGet("cnpm")]
        public IEnumerable<VienChucDTO> cnpm()
        {
            string id = "CNPM";
            try
            {
                var vc = from a in db.Vienchuc
                         join b in db.Chucvu on a.Machucvu equals b.Machucvu
                         join c in db.Bomon on a.Mabomon equals c.Mabomon
                         join d in db.Chucdanh on a.Machucdanh equals d.Machucdanh
                         where a.Mabomon == id
                         select new VienChucDTO()
                         {
                             Mavienchuc = a.Mavienchuc,
                             Mabomon = c.Mabomon,
                             Machucvu = b.Machucvu,
                             Machucdanh = d.Machucdanh,
                             Hoten = a.Hoten,
                             Sdt = a.Sdt,
                             Ngaysinh = a.Ngaysinh,
                             Gioitinh = a.Gioitinh,
                             Diachi = a.Diachi,
                             Mail = a.Mail,
                             Matkhau = a.Matkhau,
                             Ngaylamviec = a.Ngaylamviec,
                             Tenbomon = c.Tenbomon,
                             Tenchucvu = b.Tenchucvu,
                             Tenchucdanh = d.Tenchucdanh,
                             Hangchucdanh = d.Hangchucdanh,
                             Bacluong = a.Bacluong
                         };
                return vc.ToList();
            }
            catch (DbUpdateException)
            {
                throw;
            }
        }
        [HttpGet("khmt")]
        public IEnumerable<VienChucDTO> khmt()
        {
            string id = "KHMT";
            try
            {
                var vc = from a in db.Vienchuc
                         join b in db.Chucvu on a.Machucvu equals b.Machucvu
                         join c in db.Bomon on a.Mabomon equals c.Mabomon
                         join d in db.Chucdanh on a.Machucdanh equals d.Machucdanh
                         where a.Mabomon == id
                         select new VienChucDTO()
                         {
                             Mavienchuc = a.Mavienchuc,
                             Mabomon = c.Mabomon,
                             Machucvu = b.Machucvu,
                             Machucdanh = d.Machucdanh,
                             Hoten = a.Hoten,
                             Sdt = a.Sdt,
                             Ngaysinh = a.Ngaysinh,
                             Gioitinh = a.Gioitinh,
                             Diachi = a.Diachi,
                             Mail = a.Mail,
                             Matkhau = a.Matkhau,
                             Ngaylamviec = a.Ngaylamviec,
                             Tenbomon = c.Tenbomon,
                             Tenchucvu = b.Tenchucvu,
                             Tenchucdanh = d.Tenchucdanh,
                             Hangchucdanh = d.Hangchucdanh,
                             Bacluong = a.Bacluong
                         };
                return vc.ToList();
            }
            catch (DbUpdateException)
            {
                throw;
            }
        }


        [HttpGet("{id}")]
        public VienChucDTO Details(string id)
        {
            try
            {
                var vc = from a in db.Vienchuc
                         join b in db.Chucvu on a.Machucvu equals b.Machucvu
                         join c in db.Bomon on a.Mabomon equals c.Mabomon
                         join d in db.Chucdanh on a.Machucdanh equals d.Machucdanh
                         
                         where a.Mavienchuc == id
                         select new VienChucDTO()
                         {
                             Mavienchuc = a.Mavienchuc,
                            Hangchucdanh=d.Hangchucdanh,
                           
                             Mabomon = c.Mabomon,
                             Machucvu = b.Machucvu,
                             Machucdanh = d.Machucdanh,
                             Hoten = a.Hoten,
                             Sdt = a.Sdt,
                             Ngaysinh = a.Ngaysinh,
                             Gioitinh = a.Gioitinh,
                             Diachi = a.Diachi,
                             Mail = a.Mail,
                             Matkhau = a.Matkhau,
                             Ngaylamviec = a.Ngaylamviec,
                             Tenbomon = c.Tenbomon,
                             Tenchucvu = b.Tenchucvu,
                             Tenchucdanh = d.Tenchucdanh,
                             Bacluong = a.Bacluong
                         };
                return vc.SingleOrDefault();
            }
            catch (DbUpdateException)
            {
                throw;
            }
        }
        [HttpGet("dg")]
        public IEnumerable<VienChucDTO> DG()
        {
            try
            {
                var vc = from a in db.Vienchuc
                         join b in db.Chucvu on a.Machucvu equals b.Machucvu
                         join c in db.Bomon on a.Mabomon equals c.Mabomon
                         join d in db.Chucdanh on a.Machucdanh equals d.Machucdanh
                         join e in db.Phancong on a.Mavienchuc equals e.Mavienchuc
                        
                         select new VienChucDTO()
                         {
                             Mavienchuc = a.Mavienchuc,
                             Manamhoc= e.Manamhoc,
                             Mabomon = c.Mabomon,
                             Machucvu = b.Machucvu,
                             Machucdanh = d.Machucdanh,
                             Hoten = a.Hoten,
                             Sdt = a.Sdt,
                             Ngaysinh = a.Ngaysinh,
                             Gioitinh = a.Gioitinh,
                             Diachi = a.Diachi,
                             Mail = a.Mail,
                             Matkhau = a.Matkhau,
                             Ngaylamviec = a.Ngaylamviec,
                             Tenbomon = c.Tenbomon,
                             Tenchucvu = b.Tenchucvu,
                             Tenchucdanh = d.Tenchucdanh,
                             Bacluong = a.Bacluong
                         };
                return vc.ToList();
            }
            catch (DbUpdateException)
            {
                throw;
            }
        }

        [HttpGet("bomon/{id}")]
        public IEnumerable<VienChucDTO> VCBomon(string id)
        {
            try
            {
                var vc = from a in db.Vienchuc
                         join b in db.Chucvu on a.Machucvu equals b.Machucvu
                         join c in db.Bomon on a.Mabomon equals c.Mabomon
                         join d in db.Chucdanh on a.Machucdanh equals d.Machucdanh
                        
                      
                         where a.Mabomon == id
                         select new VienChucDTO()
                         {
                             Mavienchuc = a.Mavienchuc,
                             Mabomon = c.Mabomon,
                            
                             Machucvu = b.Machucvu,
                             Machucdanh = d.Machucdanh,
                             Hoten = a.Hoten,
                             Sdt = a.Sdt,
                             Ngaysinh = a.Ngaysinh,
                             Gioitinh = a.Gioitinh,
                             Diachi = a.Diachi,
                             Mail = a.Mail,
                             Matkhau = a.Matkhau,
                             Ngaylamviec = a.Ngaylamviec,
                             Tenbomon = c.Tenbomon,
                             Tenchucvu = b.Tenchucvu,
                             Tenchucdanh = d.Tenchucdanh,
                             Bacluong = a.Bacluong
                         };
                return vc.ToList();
            }
            catch (DbUpdateException)
            {
                throw;
            }
        }
        [HttpGet("vcgioi")]
        public IEnumerable<VienChucDTO> VCgioi()
        {
            try
            {
                var vc = from a in db.Vienchuc
                         join b in db.Chucvu on a.Machucvu equals b.Machucvu
                         join c in db.Bomon on a.Mabomon equals c.Mabomon
                         join d in db.Chucdanh on a.Machucdanh equals d.Machucdanh
                         join e in db.Danhgia on a.Mavienchuc equals e.Mavienchuc
                         where e.Khoa == 2
                         select new VienChucDTO()
                         {
                             Mavienchuc = a.Mavienchuc,
                            Masodanhgia= e.Masodanhgia,
                             Mabomon = c.Mabomon,
                             Machucvu = b.Machucvu,
                             Machucdanh = d.Machucdanh,
                             Hoten = a.Hoten,
                             Sdt = a.Sdt,
                             Ngaysinh = a.Ngaysinh,
                             Gioitinh = a.Gioitinh,
                             Diachi = a.Diachi,
                             Mail = a.Mail,
                             Matkhau = a.Matkhau,
                             Ngaylamviec = a.Ngaylamviec,
                             Tenbomon = c.Tenbomon,
                             Tenchucvu = b.Tenchucvu,
                             Tenchucdanh = d.Tenchucdanh,
                             Bacluong = a.Bacluong
                         };
                return vc.ToList();
            }
            catch (DbUpdateException)
            {
                throw;
            }
        }
        [HttpGet("vcxs")]
        public IEnumerable<VienChucDTO> VCXS()
        {
            try
            {
                var vc = from a in db.Vienchuc
                         join b in db.Chucvu on a.Machucvu equals b.Machucvu
                         join c in db.Bomon on a.Mabomon equals c.Mabomon
                         join d in db.Chucdanh on a.Machucdanh equals d.Machucdanh
                         join e in db.Danhgia on a.Mavienchuc equals e.Mavienchuc
                         where e.Khoa == 1
                         select new VienChucDTO()
                         {
                             Mavienchuc = a.Mavienchuc,
                             Mabomon = c.Mabomon,
                             Masodanhgia = e.Masodanhgia,
                             Machucvu = b.Machucvu,
                             Machucdanh = d.Machucdanh,
                             Hoten = a.Hoten,
                             Sdt = a.Sdt,
                             Ngaysinh = a.Ngaysinh,
                             Gioitinh = a.Gioitinh,
                             Diachi = a.Diachi,
                             Mail = a.Mail,
                             Matkhau = a.Matkhau,
                             Ngaylamviec = a.Ngaylamviec,
                             Tenbomon = c.Tenbomon,
                             Tenchucvu = b.Tenchucvu,
                             Tenchucdanh = d.Tenchucdanh,
                             Bacluong = a.Bacluong
                         };
                return vc.ToList();
            }
            catch (DbUpdateException)
            {
                throw;
            }
        }

        [HttpGet("vctb")]
        public IEnumerable<VienChucDTO> vctb()
        {
            try
            {
                var vc = from a in db.Vienchuc
                         join b in db.Chucvu on a.Machucvu equals b.Machucvu
                         join c in db.Bomon on a.Mabomon equals c.Mabomon
                         join d in db.Chucdanh on a.Machucdanh equals d.Machucdanh
                         join e in db.Danhgia on a.Mavienchuc equals e.Mavienchuc
                         where e.Khoa == 3
                         select new VienChucDTO()
                         {
                             Mavienchuc = a.Mavienchuc,
                             Mabomon = c.Mabomon,
                             Machucvu = b.Machucvu,
                             Masodanhgia = e.Masodanhgia,
                             Machucdanh = d.Machucdanh,
                             Hoten = a.Hoten,
                             Sdt = a.Sdt,
                             Ngaysinh = a.Ngaysinh,
                             Gioitinh = a.Gioitinh,
                             Diachi = a.Diachi,
                             Mail = a.Mail,
                             Matkhau = a.Matkhau,
                             Ngaylamviec = a.Ngaylamviec,
                             Tenbomon = c.Tenbomon,
                             Tenchucvu = b.Tenchucvu,
                             Tenchucdanh = d.Tenchucdanh,
                             Bacluong = a.Bacluong
                         };
                return vc.ToList();
            }
            catch (DbUpdateException)
            {
                throw;
            }
        }

        [HttpGet("vcyeu")]
        public IEnumerable<VienChucDTO> vcyeu()
        {
            try
            {
                var vc = from a in db.Vienchuc
                         join b in db.Chucvu on a.Machucvu equals b.Machucvu
                         join c in db.Bomon on a.Mabomon equals c.Mabomon
                         join d in db.Chucdanh on a.Machucdanh equals d.Machucdanh
                         join e in db.Danhgia on a.Mavienchuc equals e.Mavienchuc
                         where e.Khoa == 4
                         select new VienChucDTO()
                         {
                             Mavienchuc = a.Mavienchuc,
                             Mabomon = c.Mabomon,
                             Machucvu = b.Machucvu,
                             Masodanhgia = e.Masodanhgia,
                             Machucdanh = d.Machucdanh,
                             Hoten = a.Hoten,
                             Sdt = a.Sdt,
                             Ngaysinh = a.Ngaysinh,
                             Gioitinh = a.Gioitinh,
                             Diachi = a.Diachi,
                             Mail = a.Mail,
                             Matkhau = a.Matkhau,
                             Ngaylamviec = a.Ngaylamviec,
                             Tenbomon = c.Tenbomon,
                             Tenchucvu = b.Tenchucvu,
                             Tenchucdanh = d.Tenchucdanh,
                             Bacluong = a.Bacluong
                         };
                return vc.ToList();
            }
            catch (DbUpdateException)
            {
                throw;
            }
        }
        public string auto_id()
        {

            int id;
            string autoID = "CB";
            if (db.Vienchuc.Count() == 0) id = 0;
            else
            {
                var maxID = db.Vienchuc.Max(x => x.Mavienchuc);
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

        [HttpPost]
        public int Themvienchuc(Vienchuc vc)
        {
            vc.Mavienchuc = auto_id();
            db.Vienchuc.Add(vc);
            db.SaveChanges();

            return 1;
        }
        [HttpPut("{id}")]

        public int Edit(Vienchuc vc)
        {
            Vienchuc vchuc = db.Vienchuc.Find(vc.Mavienchuc);

            vchuc.Mavienchuc = vchuc.Mavienchuc;
            vchuc.Mail = vchuc.Mail;
            vchuc.Matkhau = vchuc.Matkhau;

            vchuc.Mabomon = vc.Mabomon;
            vchuc.Machucdanh = vc.Machucdanh;
            vchuc.Machucvu = vc.Machucvu;
            vchuc.Hoten = vc.Hoten;
            vchuc.Sdt = vc.Sdt;
            vchuc.Ngaysinh = vc.Ngaysinh;
            vchuc.Gioitinh = vc.Gioitinh;
            vchuc.Diachi = vc.Diachi;
            vc.Ngaylamviec = vc.Ngaylamviec;
            vc.Bacluong = vc.Bacluong;

            try
            {
                db.Entry(vchuc).State = EntityState.Modified;
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
                Vienchuc vc = db.Vienchuc.Find(id);

                if (vc != null)
                {
                    if (db.Congviec.Where(x => x.Mavienchuc == vc.Mavienchuc).Count() > 0 || db.Phancong.Where(x => x.Mavienchuc == vc.Mavienchuc).Count() > 0 || db.Danhgia.Where(x => x.Mavienchuc == vc.Mavienchuc).Count() > 0 || db.Khenthuong.Where(x => x.Mavienchuc == vc.Mavienchuc).Count() > 0)
                    {
                        return BadRequest();
                    }
                    else
                    {
                        db.Vienchuc.Remove(vc);

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
