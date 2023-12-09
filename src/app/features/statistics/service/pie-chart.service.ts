import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PieChartService {
  public getLabel(isSmall: boolean) {
    if (isSmall) {
      return this.getMobileLabel();
    }
    return this.getDesktopLabel();
  }

  public getLabelLine(isSmall: boolean) {
    if (isSmall) {
      return this.getMobileLabelLine();
    }
    return this.getDesktopLabelLine();
  }

  public getLegend(isSmall: boolean, data: any[]) {
    data.sort((a, b) => b.value - a.value);
    const sortedLegendNames = data.map((item) => item.name);

    if (isSmall) {
      return this.getMobileLegend(data);
    }
    return this.getDesktopLegend(data);
  }

  private getMobileLabel() {
    return {
      color: 'white',
      formatter: '{b}: \n {c}zł ({d}%)',
      position: 'center',
      show: false,
    };
  }

  private getDesktopLabel() {
    return {
      color: 'white',
      formatter: '{b}: {c}zł ({d}%)',
      show: true,
    };
  }

  private getMobileLabelLine() {
    return {
      smooth: 0.2,
      length: 1,
      length2: 2,
    };
  }

  private getDesktopLabelLine() {
    return {
      smooth: 0.2,
      length: 10,
      length2: 10,
    };
  }

  private getMobileLegend(data: any[]) {
    return {
      top: 'bottom',
      data: data,
      selectedMode: false,
    };
  }

  private getDesktopLegend(data: any[]) {
    return {
      show: false,
    };
  }
}
