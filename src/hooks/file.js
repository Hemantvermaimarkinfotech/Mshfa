
export const useFile = () => {
    const showFile = (blob, fileName, print = false) => {
        const newBlob = new Blob([blob], {type: "application/pdf"})

        // IE doesn't allow using a blob object directly as link href
        // instead it is necessary to use msSaveOrOpenBlob
        if (window.navigator && window.navigator.msSaveOrOpenBlob) {
            window.navigator.msSaveOrOpenBlob (newBlob);
            return;
        }

        // For other browsers:
        // Create a link pointing to the ObjectURL containing the blob.
        const data = window.URL.createObjectURL(newBlob);
        if (print) {
            printIframe(data, fileName);

        } else {
            const link = document.createElement('a');
            link.href = data;
            link.download=fileName;
            link.setAttribute("style", "display: none");
            link.click ();
            setTimeout(function(){
                // For Firefox it is necessary to delay revoking the ObjectURL
                window.URL.revokeObjectURL(data);
            }, 100);
        }
    }

    const getIframe = (name) => {
        const existingFrame = document.getElementById(`frame_${name}`);
        if (existingFrame) document.body.removeChild(existingFrame);

        const iframe = document.createElement('iframe');
        iframe.setAttribute("style", "display: none; width: 100vh; height: 100vh");
        iframe.id = `frame_${name}`;
        iframe.name = name;
        document.body.appendChild(iframe);
        return iframe;
    }

    const printIframe = (url, name) => {
        const existingFrame = document.getElementById(`frame_${name}`);
        if (existingFrame) document.body.removeChild(existingFrame);

        const iframe = getIframe(name);
        iframe.src = url;
        iframe.onload = () => {
            const pdfFrame = window.frames[name];
            pdfFrame.focus();
            pdfFrame.print();
        }
    }

    const getBlob = (path, name) => {
        return fetch(`${process.env.NODE_ENV === 'development' ? process.env.REACT_APP_BACKEND_ROOT : window.REACT_APP_BACKEND_ROOT}${path}/`)
            .then(r => r.blob())
    }

    const uploadFile = (path, name) => {
        getBlob(path, name).then(blob => showFile(blob, name));
    }

    const printFile = (path, name) => {
        getBlob(path, name).then(blob => showFile(blob, name, true));
    }

    const previewFile = (path, name) => {
        getBlob(path, name).then(blob => {
            const newBlob = new Blob([blob], {type: "application/pdf"})
            if (window.navigator && window.navigator.msSaveOrOpenBlob) {
                window.navigator.msSaveOrOpenBlob (newBlob);
                return;
            }
            const data = window.URL.createObjectURL(newBlob);
            window.open(data, "_new");
        })
    }

    function printImage(src, name) {
        printIframe(src, name);
        let win = window.open(src, "_new");
        win.document.open();
        win.document.write([
            '<html lang="en">',
            '   <head title="imagePreview">',
            '   </head>',
            '   <body onload="window.print()" onafterprint="window.close()">',
            '       <img alt="preview" src="' + src + '"/>',
            '   </body>',
            '</html>'
        ].join(''));
        win.document.close();
    }

    return { uploadFile, printFile, printImage, previewFile };

}
