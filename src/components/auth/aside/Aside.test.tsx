import React from 'react';
import {render} from '@testing-library/react';
import {LoginAside} from './Aside';

describe('Aside component: ', () => {
    test('Should renders correctly', () => {
        const {container} = render(<LoginAside/>);

        expect(container).toMatchSnapshot();
    })
})