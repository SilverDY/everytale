import React from 'react';
import { Helmet } from 'react-helmet';

type Props = {
    children: any;
    css: string;
    scripts: string[];
};

const HTML = ({ children, css, scripts = [] }: Props) => {
    const head = Helmet.renderStatic();

    return (
        <html lang="">
            <head>
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                {head.base.toComponent()}
                {head.title.toComponent()}
                {head.meta.toComponent()}
                {head.link.toComponent()}
                {head.script.toComponent()}
                <style id="jss-server-side">{css}</style>
                <link
                    rel="stylesheet"
                    href={'https://fonts.googleapis.com/css?family=Roboto:300,400,500'}
                />
                <link
                    href="https://fonts.googleapis.com/css?family=Inter&display=swap"
                    rel="stylesheet"
                />
                {/*<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAJDx3MUaDATKAp2nWrmor22X6zSZgDZQE&libraries=places" /> */}
            </head>
            <body>
                {/* eslint-disable-next-line react/no-danger */}
                <div id="app" dangerouslySetInnerHTML={{ __html: children }} />
                {scripts.filter(Boolean).map((src: string) => (
                    <script key={src} src={src} />
                ))}
            </body>
        </html>
    );
};

export default HTML;
