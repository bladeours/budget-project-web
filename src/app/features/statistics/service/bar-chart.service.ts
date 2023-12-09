import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class BarChartService {
  public getLabel(isSmall: boolean) {
    if (isSmall) {
      return this.getMobileLabel();
    }
    return this.getDesktopLabel();
  }

  public getTooltip(isSmall: boolean) {
    if (isSmall) {
      return this.getMobileToolTip();
    }
    return this.getDesktopToolTip();
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

  private getMobileToolTip() {
    return {
      show: false,
    };
  }

  private getDesktopToolTip() {
    return {
      trigger: 'axis',
      formatter: '{b}: {c}zł',
      axisPointer: {
        type: 'none',
      },
    };
  }
}
