/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

export const thHeadCSS = (isId: string) => css`
    display: ${isId === '_id' ? 'none' : 'table-cell'};
    padding: 8px;
`;

export const tdRowsCSS = (index: number) => css`
    display: ${index === 0 ? 'none' : 'table-cell'};
    padding: 8px;
`;
