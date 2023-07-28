import { Injectable } from '@nestjs/common';
import axios from 'axios';
import * as cheerio from 'cheerio';

@Injectable()
export class PharmaciesService {
    async getPharmacies(commune: string) {
        const url = `http://www.pagesjaunes.ci/pharmacies-de-garde-${commune}/`;

        try {
            const response = await axios.get(url)
            const html = response.data;
            return this.scrapePharmacies(html);
        } catch (error) {
            throw new Error('Impossible de récupérer les pharmacies de la garde');
        }
    }


    private scrapePharmacies(html: string) {
        const $ = cheerio.load(html);
        const pharmacyElements = $('div.lp-grid-box').find('a');
        const dataToReturn = [];
        // console.log("pharmacyElements", typeof pharmacyElements);
        // const keys = Object.keys(pharmacyElements);
        // // console.log("keys", keys);
        // const premierElement = pharmacyElements[keys[0]].childre;
        // console.log(premierElement);
        
        pharmacyElements.map((index, element) => {
            const link = $(element).text();
            dataToReturn.push({
                link
            })
        })
        const pharmaciesContenantMotCle = dataToReturn.filter(item => item.link.includes("Pharmacie "));
        const nouveauTableau = pharmaciesContenantMotCle.map(item => {
            return {
                link: item.link.replace(/[\t\n]/g, "")
            };
          });
        return nouveauTableau;
    }
}
