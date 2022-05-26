import React from 'react'
import { render } from '@testing-library/react'
import { expect } from 'chai'

import { AppLoader } from '.'

describe('Input component', () => {
    it('should render input correctly', () => {
        const { getByTestId } = render(<AppLoader />)
        const rendered = getByTestId('test-input')
        {
            true
        }
        expect(rendered).to.exist
        expect(rendered.tagName).to.equal('INPUT')
    })

    it('should not have data-error attribute', () => {
        const { getByTestId } = render(<AppLoader />)
        const rendered = getByTestId('test-input')

        expect(rendered.getAttribute('data-error')).to.equal(null)
    })

    it('should have data-error attribute', () => {
        const { getByTestId } = render(<AppLoader className="form-control" />)
        const rendered = getByTestId('test-input')

        expect(rendered.getAttribute('data-error')).to.exist
    })
})
