import { Component } from '@angular/core';
import {FooterInterface} from "../../../models/footer-interface";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {

  public footer: FooterInterface[] = [
    {
      name: "Twitter",
      link: "https://twitter.com/home"
    },
    {
      name: "Facebook",
      link: "www.facebook.com"
    },
    {
      name: "Instagram",
      link: "www.instagram.com"
    },
    {
      name: "Tik Tok",
      link: "www.tiktok.com"
    }
  ]


}
