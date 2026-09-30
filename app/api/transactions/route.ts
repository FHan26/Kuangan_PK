import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    // Sementara untuk development.
    // Nanti diganti dengan userId dari session.
    const userId = "dummy1";

    const transactions = await prisma.transaction.findMany({
      where: {
        userId,
      },
      orderBy: {
        tanggal: "desc",
      },
    });

    return NextResponse.json(transactions);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Gagal mengambil data transaksi." },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      jenis,
      kategori,
      nominal,
      tanggal,
      deskripsi,
    } = body;

    // Sementara untuk development.
    // Nanti diganti dengan userId dari session.
    const userId = "dummy1";

    if (!jenis || !kategori || !nominal || !tanggal) {
      return NextResponse.json(
        { error: "Semua data transaksi wajib diisi." },
        { status: 400 }
      );
    }

    const transaction = await prisma.transaction.create({
      data: {
        userId,
        jenis,
        kategori,
        nominal: Number(nominal),
        tanggal: new Date(tanggal),
        deskripsi: deskripsi || null,
      },
    });

    return NextResponse.json(transaction, { status: 201 });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Gagal menambahkan transaksi." },
      { status: 500 }
    );
  }
}