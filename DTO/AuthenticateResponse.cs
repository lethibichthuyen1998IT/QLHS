using QuanLyHieuSuat.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace QuanLyHieuSuat.DTO
{
    public class AuthenticateResponse
    {
        public string Mavienchuc { get; set; }

        public string Machucvu { get; set; }

        public string Machucdanh { get; set; }

        public string Mabomon { get; set; }

        public string Hoten { get; set; }
        public bool? Gioitinh { get; set; }
        public DateTime? Ngaysinh { get; set; }
        public string Diachi { get; set; }
        public string Mail { get; set; }
        public string Sdt { get; set; }
        public DateTime? Ngaylamviec { get; set; }
        public string Matkhau { get; set; }
        public string Token { get; set; }

        public AuthenticateResponse(Vienchuc user, string token)
        {
            Mavienchuc = user.Mavienchuc;
            Machucvu = user.Machucvu;


            Machucdanh = user.Machucdanh;
            Mabomon = user.Mabomon;
            Hoten = user.Hoten;
            Gioitinh = user.Gioitinh;
            Ngaysinh = user.Ngaysinh;
            Diachi = user.Diachi;
            Ngaysinh = user.Ngaysinh;
            Mail = user.Mail;
            Sdt = user.Sdt;
            Ngaylamviec = user.Ngaylamviec;
            Matkhau = user.Matkhau;
            Token = token;
        }
    }
}
