

export const fileUpload = async(file) => {
    // if(!file) throw new Error('No file to upload');
    if(!file) return null;

    const cloudUrl = 'https://api.cloudinary.com/v1_1/fnoceda83/upload';
    const formData = new FormData();

    formData.append('upload_preset', 'react-journal');
    formData.append('file', file);

    try {

        const resp = await fetch(cloudUrl, {
            method: 'POST', 
            body: formData,
        });


        if( !resp.ok ) throw new Error('Sorry, something went wrong on the BE');

        const cloudResponse = await resp.json();

        return cloudResponse.secure_url;
        
    } catch (error) {
        console.log(error.message)
        // throw new Error(error.message);
        return null;
    }



}