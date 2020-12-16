using System;
using System.Collections.Generic;

namespace QuanLyHieuSuat.Models
{
    public partial class Danhgia
    {
        public string Masodanhgia { get; set; }
        public int Manamhoc { get; set; }
        public string Mavienchuc { get; set; }
        public string Kqth { get; set; }
        public string Daoduc { get; set; }
        public string Trachnhiem { get; set; }
        public string Khac { get; set; }
        public string Uudiem { get; set; }
        public string Nhuocdiem { get; set; }
        public int? Loai { get; set; }
        public string Ykbm { get; set; }
        public string Bomon { get; set; }
        public string Ykienkhoa { get; set; }
        public int? Khoa { get; set; }
        public DateTime? Ngayvcdg { get; set; }
        public DateTime? Ngaybmdg { get; set; }
        public DateTime? Ngaykhoadg { get; set; }

        public virtual Namhoc ManamhocNavigation { get; set; }
        public virtual Vienchuc MavienchucNavigation { get; set; }
    }
}
