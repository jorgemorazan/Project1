import {Injectable, Pipe} from '@angular/core';
import * as _ from 'lodash';

@Pipe({ name: 'orderBy' })
export class OrderByPipe {
  transform(array, args) {
    return _.sortBy(array, args);
  }
}