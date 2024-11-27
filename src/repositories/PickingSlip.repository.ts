/* eslint-disable prettier/prettier */

import { Injectable } from "@nestjs/common";
import { DatabaseModule } from "src/config/database";

type GetPickingSlipsQuery = {
    limit?: number,
    offset?: number,
    status?: string
}

@Injectable()
export class PickingSlipRepository {

    async GetPickingSlips(query: GetPickingSlipsQuery) {

        const QUERY_WITH_FILTER = `
            SELECT
                ps.order_id,
                ps.id,
                (CASE 
                    WHEN psd.held_at IS NOT NULL THEN 'held'
                    WHEN psd.printed_at IS NOT NULL AND psd.inspected_at IS NULL AND psd.shipped_at IS NULL AND psd.held_at IS NULL THEN 'printed'
                    WHEN psd.printed_at IS NULL AND psd.inspected_at IS NULL AND psd.shipped_at IS NULL AND psd.held_at IS NULL THEN 'not printed'
                    END	
                ) AS picking_slip_status,
                (CASE 
                    WHEN EXISTS (
                        SELECT 1 
                        FROM picking_slip_items psi 
                        WHERE psi.picking_slip_id = ps.id AND psi.is_pre_order = 1
                        LIMIT 1
                    ) THEN 'true'
                    ELSE 'false'
                END) AS has_pre_order_item
            FROM
                picking_slips AS ps
            INNER JOIN picking_slip_dates AS psd ON psd.picking_slip_id = ps.id
            INNER JOIN picking_slip_items AS psi ON psi.picking_slip_id = ps.id
            WHERE
                (CASE 
                    WHEN psd.held_at IS NOT NULL THEN 'held'
                    WHEN psd.printed_at IS NOT NULL AND psd.inspected_at IS NULL AND psd.shipped_at IS NULL AND psd.held_at IS NULL THEN 'printed'
                    WHEN psd.printed_at IS NULL AND psd.inspected_at IS NULL AND psd.shipped_at IS NULL AND psd.held_at IS NULL THEN 'not printed'
                END) = ?
            ORDER BY
                ps.created_at DESC
            LIMIT ? OFFSET ?
        `;

        const QUERY_ALL = `
            SELECT
                ps.order_id,
                ps.id,
                (CASE 
                    WHEN psd.held_at IS NOT NULL THEN 'held'
                    WHEN psd.printed_at IS NOT NULL AND psd.inspected_at IS NULL AND psd.shipped_at IS NULL AND psd.held_at IS NULL THEN 'printed'
                    WHEN psd.printed_at IS NULL AND psd.inspected_at IS NULL AND psd.shipped_at IS NULL AND psd.held_at IS NULL THEN 'not printed'
                    END	
                ) AS picking_slip_status,
                (CASE 
                    WHEN EXISTS (
                        SELECT 1 
                        FROM picking_slip_items psi 
                        WHERE psi.picking_slip_id = ps.id AND psi.is_pre_order = 1
                        LIMIT 1
                    ) THEN 'true'
                    ELSE 'false'
                END) AS has_pre_order_item
            FROM
                picking_slips AS ps
            INNER JOIN picking_slip_dates AS psd ON psd.picking_slip_id = ps.id
            INNER JOIN picking_slip_items AS psi ON psi.picking_slip_id = ps.id
            ORDER BY
                ps.created_at DESC
            LIMIT ? OFFSET ?
        `
        try {
            const connection = await DatabaseModule.getConnection();  

            let rows;

            if (query.status !== 'all')
                [rows] = await connection.query(QUERY_WITH_FILTER, [query.status, query.limit, query.offset]);
            else 
                [rows] = await connection.query(QUERY_ALL, [query.limit, query.offset])
           
            return rows; 
          } catch (err) {
            throw new Error('Error while fetching picking slips: ' + err.message);
          }
    }
}