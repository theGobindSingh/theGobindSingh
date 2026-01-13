import { CloudinaryAsset, SecureCloudinaryAsset } from '@/types/cloudinary';
import cloudinary from 'cloudinary';
import { NextApiHandler } from 'next';

interface Response {
  data: SecureCloudinaryAsset[];
  message: string;
  isSuccess: boolean;
}

const handler: NextApiHandler<Response> = async (req, res) => {
  if (req.method !== 'GET') {
    return res
      .status(405)
      .json({ message: 'Method Not Allowed', isSuccess: false, data: [] });
  }
  if (
    !process.env.CLOUDINARY_NAME ||
    !process.env.CLOUDINARY_API_KEY ||
    !process.env.CLOUDINARY_API_SECRET
  ) {
    return res.status(500).json({
      message: 'Cloudinary configuration is missing',
      isSuccess: false,
      data: [],
    });
  }
  cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
  try {
    const data = await cloudinary.v2.api.resources({
      type: 'upload',
      prefix: 'photo_portfolio', // add your folder
      max_results: 99,
    });
    const secureData: SecureCloudinaryAsset[] = (
      (data?.resources as CloudinaryAsset[]) ?? []
    ).map(({ public_id, secure_url, height, width, format, bytes }) => ({
      id: public_id,
      url: secure_url,
      blurUrl: secure_url.replace(
        '/upload/',
        '/upload/w_20,h_20,c_fill,e_blur:1000,q_auto/',
      ),
      height,
      width,
      format,
      bytes,
    }));
    return res.status(200).json({
      message: 'Images fetched successfully',
      isSuccess: true,
      data: secureData,
    });
  } catch {
    return res
      .status(500)
      .json({ message: 'Failed to fetch images', isSuccess: false, data: [] });
  }
};

export default handler;
