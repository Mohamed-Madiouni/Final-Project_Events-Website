 export default function history(d) {
    const date = new Date();
    const eventdate = new Date(d);

    const hist = Math.abs((date - eventdate) / 1000);

    if (hist <= 240) return `${hist} mins ago`;
    else if (hist <= 86400) return `${Math.round(hist / 60)} hours ago`;
    else {
      let day = Math.floor(hist / 86400);
      return `${day} days ago`;
    }
  }