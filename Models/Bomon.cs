using System;
using System.Collections.Generic;

namespace QuanLyHieuSuat.Models
{
    public partial class Bomon
    {
        public string Mabomon { get; set; }
        public string Makhoa { get; set; }
        public string Tenbomon { get; set; }

        public virtual Khoa MakhoaNavigation { get; set; }
    }
}
