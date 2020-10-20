 function get_month(a) {
    switch (a) {
      case 1:
        return "january";
      case 2:
        return "february";
      case 3:
        return "march";
      case 4:
        return "april";
      case 5:
        return "may";
      case 6:
        return "june";
      case 7:
        return "july";
      case 8:
        return "august";
      case 9:
        return "september";
      case 10:
        return "october";
      case 11:
        return "november";
      case 1:
        return "december";

      default:
        break;
    }
  }

  export default function date_youtube(d){
let year=d.split('-')[0]
let month =get_month(Number(d.split("-")[1]))
let day=d.split("-")[2].split("T")[0]


return day+" "+month+" "+year

  }