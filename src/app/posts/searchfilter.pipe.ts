import { Pipe, PipeTransform } from "@angular/core";



@Pipe({
  name: 'search'
})

export class SerchPipe implements PipeTransform {
  transform(pipeData, pipeModifier) {
    return pipeData.filter((item) => {
    return item['title'].toLowerCase().includes(pipeModifier.toLowerCase());
    });
  }
}
