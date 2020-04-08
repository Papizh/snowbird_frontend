import { Component, Input, OnChanges } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-circle-chart',
  templateUrl: './circle-chart.component.html',
  styleUrls: ['./circle-chart.component.scss']
})
export class CircleChartComponent implements OnChanges{

  @Input() value: any;
  @Input() width: any;
  @Input() index: string;
  @Input() color: any;


  ngOnChanges() {
    setTimeout( () => this.drawDonutChart(), 0);
  }

  drawDonutChart(element = ('.d3-chart-' + this.index), percent= this.value, width = this.width, height = this.width, text_y = ".35em") {
    width = typeof width !== 'undefined' ? width : 330;
    height = typeof height !== 'undefined' ? height : 330;
    text_y = typeof text_y !== 'undefined' ? text_y : '-.10em';
    let dataset = {
          lower: this.calcPercent(0),
          upper: this.calcPercent(percent)
        },
        radius = Math.min(width, height) / 2,
        pie = d3.layout.pie().sort(null),
        format = d3.format(".0%");
  
    let arc = d3.svg.arc()
          .innerRadius(radius - 8)
          .outerRadius(radius);

    let svg = d3.select(element).append("svg")
          .attr("width", width)
          .attr("height", height)
          .append("g")
          .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
  
    let path = svg.selectAll("path")
          .data(pie(dataset.lower))
          .enter().append("path")
          .attr("class", (d, i) => "color" + i )
          .attr("d", arc)
          .each(function(d) { this._current = d; });
  
    let text = svg.append("text")
          .attr("text-anchor", "middle")
          .attr("dy", text_y);
  
    if (typeof(percent) === "string") {
      text.text(percent);
    }
    else {
      var progress = 0;
      var timeout = setTimeout(function () {
        clearTimeout(timeout);
        path = path.data(pie(dataset.upper));
        path.transition().duration(500).attrTween("d", function (a) {

          var i  = d3.interpolate(this._current, a);
          var i2 = d3.interpolate(progress, percent)
          this._current = i(0);
          return function(t) {
            text.text( format(i2(t) / 100) );
            return arc(i(t));
          };
        });
      }, 200);
    }
  }
  
  calcPercent(percent) {
    return [percent, 100-percent];
  }
}
