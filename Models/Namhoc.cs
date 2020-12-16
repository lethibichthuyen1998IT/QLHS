using System;
using System.Collections.Generic;

namespace QuanLyHieuSuat.Models
{
    public partial class Namhoc
    {
        public Namhoc()
        {
            Congviec = new HashSet<Congviec>();
            Danhgia = new HashSet<Danhgia>();
            Khenthuong = new HashSet<Khenthuong>();
            Phancong = new HashSet<Phancong>();
        }

        public int Manamhoc { get; set; }
        public string Tennamhoc { get; set; }

        public virtual ICollection<Congviec> Congviec { get; set; }
        public virtual ICollection<Danhgia> Danhgia { get; set; }
        public virtual ICollection<Khenthuong> Khenthuong { get; set; }
        public virtual ICollection<Phancong> Phancong { get; set; }
    }
}
