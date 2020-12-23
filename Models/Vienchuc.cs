using System;
using System.Collections.Generic;

namespace QuanLyHieuSuat.Models
{
    public partial class Vienchuc
    {
        public Vienchuc()
        {
            Congviec = new HashSet<Congviec>();
            Danhgia = new HashSet<Danhgia>();
            Khenthuong = new HashSet<Khenthuong>();
            Phancong = new HashSet<Phancong>();
        }

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

        public virtual Chucdanh MachucdanhNavigation { get; set; }
        public virtual ICollection<Congviec> Congviec { get; set; }
        public virtual ICollection<Danhgia> Danhgia { get; set; }
        public virtual ICollection<Khenthuong> Khenthuong { get; set; }
        public virtual ICollection<Phancong> Phancong { get; set; }
    }
}
