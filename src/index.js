/*
 * @Author: zoucong 
 * @Date: 2017-06-28 14:37:25 
 * @Last Modified by: zoucong
 * @Last Modified time: 2017-06-28 16:46:47
 */

import { render } from 'react-dom';
import React from 'react';

require('./scss/reset.scss');

const Home = () => <div>hello world</div>;

render(<Home />, document.getElementById('mod-app'));
