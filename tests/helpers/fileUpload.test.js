
import { v2 as cloudinary } from 'cloudinary'
import { fileUpload } from "../../src/helpers";

cloudinary.config({
    cloud_name: 'fnoceda83', 
    api_key: '876648261419274',
    api_secret: 'LMr0wtQxE_2eLgSLG5yk0tLWPrc', 
    secure: true,
});

describe('Tests on fileUpload', () => { 
    
    test('should upload the file to cloudinary', async() => { 
        const imageUrl = 'https://posterjack.ca/cdn/shop/articles/landscape_photography_tips_featured_image.jpg?v=1563408049&width=1400';
        const resp = await fetch( imageUrl );
        const blob = await resp.blob();
        const file = new File([blob], 'landscape.jpg');
        const url = await fileUpload( file );
        expect( typeof url ).toBe('string');

        const segments = url.split('/');
        const imageId = segments[segments.length - 1].replace('.jpg', '');
        const cloudResponse = await cloudinary.api.delete_resources(['journal/' + imageId], {
            resource_type: 'image'
        }); 
        console.log(cloudResponse);
     })

     test('should return null', async() => { 
        const file = new File([], 'landscape.jpg');
        const url = await fileUpload( file );
        expect( url ).toBe(null);

      })

 })


