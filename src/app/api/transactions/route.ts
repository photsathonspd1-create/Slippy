import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const orgId = searchParams.get('orgId')
    const type = searchParams.get('type')

    // Since we don't have real auth hooked up yet, we will bypass strict orgId checks for the demo,
    // but in a real scenario we'd filter by user's org.
    const whereClause: any = {}
    if (orgId) whereClause.orgId = orgId
    if (type) whereClause.type = type

    const transactions = await prisma.transaction.findMany({
      where: whereClause,
      orderBy: { txDate: 'desc' },
      take: 50,
    })

    return NextResponse.json(transactions)
  } catch (error: any) {
    console.error('Failed to fetch transactions:', error)
    return NextResponse.json({ error: 'Failed to fetch transactions', details: error.message }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    // For demo purposes, we will use a dummy orgId and userId if not provided,
    // to prevent Prisma relation errors during testing without active session.
    const orgId = body.orgId || "cm01demoorgid000000000000"
    const userId = body.userId || "cm01demouserid00000000000"

    // Simulate database insertion (we use upsert on Org/User just to ensure they exist for the foreign keys if needed, 
    // but since we are just doing a real Prisma call, let's try direct create)
    const transaction = await prisma.transaction.create({ 
      data: {
        type: body.type,
        amount: Number(body.amount),
        vendor: body.vendor,
        category: body.category,
        description: body.description,
        txDate: new Date(body.txDate || Date.now()),
        vatAmount: body.vatAmount || 0,
        whtAmount: body.whtAmount || 0,
        status: 'CONFIRMED',
        org: {
          connectOrCreate: {
            where: { id: orgId },
            create: { id: orgId, nameTh: "Test Org", orgType: "บุคคลธรรมดา" }
          }
        },
        user: {
          connectOrCreate: {
            where: { id: userId },
            create: { id: userId, email: "demo@slippy.app" }
          }
        }
      }
    })
    
    return NextResponse.json({ message: 'Created successfully', data: transaction }, { status: 201 })
  } catch (error: any) {
    console.error('Failed to create transaction:', error)
    return NextResponse.json({ error: 'Failed to create transaction', details: error.message }, { status: 500 })
  }
}

