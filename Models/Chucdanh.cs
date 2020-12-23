using System;
using System.Collections.Generic;

namespace QuanLyHieuSuat.Models
{
    public partial class Chucdanh
    {
        public Chucdanh()
        {
            Vienchuc = new HashSet<Vienchuc>();
        }

        public string Machucdanh { get; set; }
        public string Tenchucdanh { get; set; }
        public string Hangchucdanh { get; set; }

        public virtual ICollection<Vienchuc> Vienchuc { get; set; }
    }
}
