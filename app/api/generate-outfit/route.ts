// import { NextRequest, NextResponse } from 'next/server'

// export async function POST(req: NextRequest) {
//   try {
//     const { description } = await req.json()

//     if (!description || typeof description !== 'string' || !description.trim()) {
//       return NextResponse.json(
//         { error: 'Please describe the outfit you want to generate.' },
//         { status: 400 }
//       )
//     }

//     const fashionPrompt = `fashion photography, ${description.trim()}, professional model, studio lighting, high fashion magazine, elegant, detailed clothing, 8k quality, photorealistic`

//     const response = await fetch(
//       'https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-xl-base-1.0',
//       {
//         method: 'POST',
//         headers: {
//           Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           inputs: fashionPrompt,
//           parameters: {
//             negative_prompt: 'ugly, blurry, low quality, distorted, cartoon',
//             num_inference_steps: 30,
//             guidance_scale: 7.5,
//           },
//         }),
//       }
//     )

//     if (!response.ok) {
//       if (response.status === 503) {
//         return NextResponse.json(
//           { error: 'AI model is warming up, please try again in 20 seconds' },
//           { status: 503 }
//         )
//       }
//       throw new Error('Generation failed')
//     }

//     const imageBuffer = await response.arrayBuffer()
//     const base64Image = Buffer.from(imageBuffer).toString('base64')
//     const imageUrl = `data:image/jpeg;base64,${base64Image}`

//     return NextResponse.json({ image: imageUrl })

//   } catch (error) {
//     console.error('Generate outfit error:', error)
//     return NextResponse.json(
//       { error: 'Failed to generate outfit. Please try again.' },
//       { status: 500 }
//     )
//   }
// }

// import { NextRequest, NextResponse } from 'next/server'

// export async function POST(req: NextRequest) {
//   try {
//     const { description } = await req.json()

//     if (!description || typeof description !== 'string' || !description.trim()) {
//       return NextResponse.json(
//         { error: 'Please describe the outfit you want to generate.' },
//         { status: 400 }
//       )
//     }

//     const fashionPrompt = encodeURIComponent(
//       `fashion photography, ${description.trim()}, professional model, studio lighting, high fashion magazine, elegant, detailed clothing, 8k quality, photorealistic`
//     )

//     const imageUrl = `https://image.pollinations.ai/prompt/${fashionPrompt}?width=768&height=1024&nologo=true`

//     return NextResponse.json({ image: imageUrl })

//   } catch (error) {
//     console.error('Generate outfit error:', error)
//     return NextResponse.json(
//       { error: 'Failed to generate outfit. Please try again.' },
//       { status: 500 }
//     )
//   }
// }

import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const { description } = await req.json()

    if (!description || typeof description !== 'string' || !description.trim()) {
      return NextResponse.json(
        { error: 'Please describe the outfit you want to generate.' },
        { status: 400 }
      )
    }

    const input = description.trim().toLowerCase()

    // Detect style for illustration
    let subject = 'elegant female fashion figure'
    if (input.includes('male') || input.includes('man') || 
        input.includes('men') || input.includes('groom') ||
        input.includes('boy') || input.includes('suit') ||
        input.includes('sherwani') || input.includes('kurta pyjama')) {
      subject = 'elegant male fashion figure'
    } else if (input.includes('kid') || input.includes('child') || 
               input.includes('children') || input.includes('baby')) {
      subject = 'cute children fashion figure'
    } else if (input.includes('old') || input.includes('elderly') || 
               input.includes('senior')) {
      subject = 'graceful elderly fashion figure'
    } else if (input.includes('saree') || input.includes('sari') || 
               input.includes('lehenga') || input.includes('salwar') ||
               input.includes('dupatta') || input.includes('indian') ||
               input.includes('traditional') || input.includes('ethnic')) {
      subject = 'elegant indian fashion figure in traditional pose'
    }

    const fashionPrompt = encodeURIComponent(
      `high fashion illustration, ${description.trim()},
      ${subject}, haute couture fashion sketch,
      elegant elongated fashion figure, 
      Vogue fashion illustration style,
      watercolor and ink fashion artwork,
      professional fashion design illustration,
      detailed fabric texture and draping,
      soft pastel background, artistic brushstrokes,
      fashion week runway illustration,
      by famous fashion illustrators like Mats Gustafson`
    )

    const imageUrl = `https://image.pollinations.ai/prompt/${fashionPrompt}?width=768&height=1024&nologo=true&model=flux`

    return NextResponse.json({ image: imageUrl })

  } catch (error) {
    console.error('Generate outfit error:', error)
    return NextResponse.json(
      { error: 'Failed to generate outfit. Please try again.' },
      { status: 500 }
    )
  }
}