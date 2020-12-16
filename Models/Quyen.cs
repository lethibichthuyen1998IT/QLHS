using System;
using System.Collections.Generic;

namespace QuanLyHieuSuat.Models
{
    public partial class Quyen
    {
        public string Machucvu { get; set; }
        public string Machucnang { get; set; }

        public virtual Chucnang MachucnangNavigation { get; set; }
        public virtual Chucvu MachucvuNavigation { get; set; }
    }
}
