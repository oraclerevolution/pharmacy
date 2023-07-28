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
        const pharmacyDomData = $('div.lp-grid-box').find('a');
        const pharmacyDomIndicator = $('div.lp-grid-box-bottom').find('.gaddress');
        const listePharmacies = [];
        const listeIndications = [];
        
        pharmacyDomData.map((_index, element) => {
            const link = $(element).text();
            listePharmacies.push({
                link
            })
        })

        pharmacyDomIndicator.map((_index, element) => {
            const indicator = $(element).text();
            listeIndications.push({
                indicator
            })
        })

        const FiltrePharmacies = listePharmacies.filter(item => item.link.includes("Pharmacie "));
        const pharmacies = FiltrePharmacies.map(item => {
            return {
                link: item.link.replace(/[\t\n]/g, "")
            };
        });

        const result = pharmacies.map((pharmacie, index) => {
            const indication = listeIndications[index].indicator;
            return {
              pharmacie: pharmacie.link,
              indication: indication
            };
        });

        return result;
    }
}
