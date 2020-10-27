 export default function history(d) {
    const date = new Date();
    const eventdate = new Date(d);

    const hist = Math.abs((date - eventdate) / 1000);

    if (hist <= 7200) return `${Math.ceil(hist/60)} mins ago`;
    else if (hist <= 86400) return `${Math.ceil(hist / 3600)} hours ago`;
    else if(hist<604800){
      let day = Math.floor(hist / 86400);
      return `${day} days ago`;
    }
    else if(hist<2419200)
      {let week=Math.floor(hist / 604800)
      return `${week} week ago`}
      else if (hist<29030400)
      {
        let month=Math.floor(hist / 2419200)
      return `${month} month ago`;
      }
      else
     { 
       let year=Math.floor(hist / 29030400)
      return `${year} year ago`;}
    
  }